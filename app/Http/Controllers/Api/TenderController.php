<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use DB;
use Mail;
use Validator;
use Log;
use App\City;
use App\District;
use App\Cat;
use App\Subcat;
use App\Manager;
use App\Tender;
use App\Customer;
use App\Recipient;

class TenderController extends Controller
{

    public function index (Request $request)
    {
        return response()->json(['tenders' => Tender::with('customer', 'recipients')->orderBy('created_at', 'desc')->get()]);
    }

    public function load (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|integer|exists:subcats,id',
            'city_id' => 'required|integer|exists:cities,id',
            'text' => 'required|string',
            'budjet' => 'required|integer',
            'price' => 'required|boolean',
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|regex:/^[ \d\-\+\(\)]{5,15}$/',
            'attach' => 'image|mimes:image/png|size:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages()->all(), 422);
        }

        // DB::connection()->enableQueryLog();

        $recipients = Manager::managersFor($request->input('city_id'), $request->input('category_id'));
        // $recipients = Manager::managers($providers);

        try {
            DB::beginTransaction();

            $tender = Tender::create([
                'city_id' => $request->input('city_id'),
                'category_id' => $request->input('category_id'),
                'city' => City::find($request->input('city_id'))->name,
                'category' => Subcat::find($request->input('category_id'))->name,
                'text' => $request->input('text'),
                'budjet' => $request->input('budjet'),
                'price' => $request->input('price'),
            ]);

            $customer = new Customer([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
            ]);
            $tender->customer()->save($customer);

            $recipient_objects = [];
            foreach ($recipients as $recipient) {
                $recipient_objects[] = [
                    'tender_id' => $tender->id,
                    'manager_id' => $recipient->id,
                    'email' => $recipient->email,
                    'surname' => $recipient->surname,
                    'name' => $recipient->name,
                    'middle_name' => $recipient->middle_name,
                    'company' => $recipient->company,
                ];
            }
            DB::table('recipients')->insert($recipient_objects);

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            Log::error("Crash when adding tender!");
            // return response()->json(['msg' => 'tender transaction crashed'], 500);
        }

        // $pathToFile = storage_path() . '\app\uploads\pic.jpg';
        // $display = 'attached_picture.jpg';
        // $mime = 'image/jpeg';

        foreach ($recipients as $recipient) {
            $data = [];
            $data['recipient_name'] = $recipient->name . ' ' . $recipient->middle_name;
            $data['tender_text'] = $tender->text;
            $data['customer'] = $customer->name . ' ' . $customer->email . ' ' . $customer->phone;
            $data['budjet'] = $tender->budjet . 'руб. ' . ($tender->price ? 'Вы можете предложить свою цену!' : '');
            Mail::queue('emails.tender', $data, function ($m) use ($recipient) {
                // $m->from('admin@micro-tender.ru', 'microtender');
                $m->from('no-reply@micro-tender.ru', 'micro-tender.ru');

                $m->to($recipient->email, $recipient->surname)->subject('Заказ на просчёт от Микротендер.РФ');
                // $m->attach($pathToFile, ['as' => $display, 'mime' => $mime]);
            });
        }

        // $queries = DB::getQueryLog();
        // return response()->json(['rez' => 'ok', 'queries' => $queries]); 

        return response()->json(['rez' => 'ok']); 
    }
}
