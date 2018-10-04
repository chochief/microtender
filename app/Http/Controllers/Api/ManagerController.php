<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use DB;
use Log;
use Validator;
use App\Manager;

class ManagerController extends Controller
{
	// show all managers
	public function index (Request $request)
	{
		// DB::connection()->enableQueryLog();

		$managers = Manager::with('cities', 'subcats')->orderBy('created_at', 'desc')->get();

		// $queries = DB::getQueryLog();
		// return response()->json(['managers' => $managers, 'queries' => $queries]);

    	return response()->json(['managers' => $managers]);

	}

	public function manager_on (Request $request) 
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required|integer|exists:managers,id',
			'enabled' => 'required|boolean',
		]);

		if ($validator->fails()) {
			return response()->json($validator->messages()->all(), 422);
		}

		Manager::where('id', $request->input('id'))
				->update(['enabled' => $request->input('enabled')]);

		// return Manager::find($request->input('id'));
		return response()->json(['manager' => Manager::where('id', $request->input('id'))->select('id', 'enabled')->first()]);

	}

	public function delete (Request $request) 
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required|integer|exists:managers,id',
		]);

		if ($validator->fails()) {
			return response()->json($validator->messages()->all(), 422);
		}


		try {
			DB::beginTransaction();
			
			$id = $request->input('id');

			$manager = Manager::find($id);
			
			$manager->subcats()->sync([]);
			$manager->cities()->sync([]);

			$manager->delete();
			// Manager::destroy($id);

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error("Crash when deleting manager!");
			return response()->json(['msg' => 'Provider deleting transaction crashed'], 500);
		}		

		return response()->json(['rez' => 'ok', 'manager_id' => $id]);

	}

	public function load (Request $request) {
		$validator = Validator::make($request->all(), [
			'company' => 'required|string',
			'address' => 'required|string',
			'inn' => 'required|string',
			// 'site' => 'url',
			'site' => 'string',
			'categories' => 'required|array',
			'cities' => 'required|array',
			'description' => 'required|string',
			'surname' => 'required|string',
			'name' => 'required|string',
			'middle_name' => 'string',
			'post' => 'required|string',
			'phone' => 'required|regex:/^[ \d\-\+\(\)]{5,15}$/',
			'mobile' => 'regex:/^[ \d\-\+\(\)]{5,15}$/',
			'email' => 'required|email',
		]);

		if ($validator->fails()) {
			return response()->json($validator->messages()->all(), 422);
		}

		// проверка категорий и городов
		$categories = DB::table('subcats')
						->whereIn('id', $request->input('categories'))
						->select('id')
						->get()
						->pluck('id');
		$cities = DB::table('cities')
					->whereIn('id', $request->input('cities'))
					->select('id')
					->get()
					->pluck('id');
		if (($categories->count() == 0) || ($cities->count() == 0)) {
			return response()->json(['wrong_data' => 'Выбранные города или категории отсутствуют в базе!'], 422);
		}

		// return response()->json(['categories' => $categories, 'cities' => $cities]);

		// DB::connection()->enableQueryLog();

		try {
			DB::beginTransaction();

			$manager = Manager::create([
				'enabled' => 0,
				'surname' => $request->input('surname'), 
				'name' => $request->input('name'), 
				'middle_name' => $request->input('middle_name'),
				'post' => $request->input('post'), 
				'email' => $request->input('email'), 
				'phone' => $request->input('phone'), 
				'mobile' => $request->input('mobile'),
				'company' => $request->input('company'),
				'address' => $request->input('address'),
				'inn' => $request->input('inn'),
				'site' => $request->input('site'),
				'description' => $request->input('description'),
			]);

			$manager->subcats()->sync($categories->toArray());
			$manager->cities()->sync($cities->toArray());

			$id = $manager->id;

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error("Crash when adding manager!");
			return response()->json(['msg' => 'Provider adding transaction crashed'], 500);
		}

		// $queries = DB::getQueryLog();
		// return response()->json(['rez' => 'ok', 'queries' => $queries]);

		return response()->json(['rez' => 'ok', 'manager_id' => $id]);
	}

	public function update (Request $request) {
		$validator = Validator::make($request->all(), [
			'id' => 'required|exists:managers,id',  //unique:managers,id
			'address' => 'required|string',
			'inn' => 'required|string',
			// 'site' => 'url',
			'site' => 'string',
			'categories' => 'required|array',
			'cities' => 'required|array',
			'description' => 'required|string',
			'surname' => 'required|string',
			'name' => 'required|string',
			'middle_name' => 'string',
			'post' => 'required|string',
			'phone' => 'required|regex:/^[ \d\-\+\(\)]{5,15}$/',
			'mobile' => 'regex:/^[ \d\-\+\(\)]{5,15}$/',
			'email' => 'required|email',
		]);

		if ($validator->fails()) {
			return response()->json($validator->messages()->all(), 422);
		}

		// проверка категорий и городов
		$categories = DB::table('subcats')
						->whereIn('id', $request->input('categories'))
						->select('id')
						->get()
						->pluck('id');
		$cities = DB::table('cities')
					->whereIn('id', $request->input('cities'))
					->select('id')
					->get()
					->pluck('id');
		if (($categories->count() == 0) || ($cities->count() == 0)) {
			return response()->json(['wrong_data' => 'Выбранные города или категории отсутствуют в базе!'], 422);
		}

		// return response()->json(['categories' => $categories, 'cities' => $cities]);

		DB::connection()->enableQueryLog();

		try {
			DB::beginTransaction();

			$manager = Manager::find($request->input('id'));
			
			$manager->update([
				'surname' => $request->input('surname'), 
				'name' => $request->input('name'), 
				'middle_name' => $request->input('middle_name'),
				'post' => $request->input('post'), 
				'email' => $request->input('email'), 
				'phone' => $request->input('phone'), 
				'mobile' => $request->input('mobile'),
				'company' => $request->input('company'),
				'address' => $request->input('address'),
				'inn' => $request->input('inn'),
				'site' => $request->input('site'),
				'description' => $request->input('description'),
			]);

			$manager->subcats()->sync($categories->toArray());
			$manager->cities()->sync($cities->toArray());

			DB::commit();
		} catch (Exception $e) {
			DB::rollback();
			Log::error("Crash when updating manager!");
			return response()->json(['msg' => 'Provider updating transaction crashed'], 500);
		}

		$queries = DB::getQueryLog();
		return response()->json(['rez' => 'ok', 'queries' => $queries]);

		// return response()->json(['rez' => 'ok']);
	}

}
