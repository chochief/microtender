<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Validator;
use App\City;
use App\District;
use App\Cat;
use App\Subcat;

class DataController extends Controller
{
    public function load()
    {
    	// sleep(5);
    	return response()->json([
    		'districts' => District::all(),
    		'cities' => City::all(),
    		'cats' => Cat::all(),
    		'subcats' => Subcat::all(),
    	]);
    }

    public function subcat_on (Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:subcats,id',
            'enabled' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages()->all(), 422);
        }

        Subcat::where('id', $request->input('id'))
                ->update(['enabled' => $request->input('enabled')]);

        // return Manager::find($request->input('id'));
        return response()->json(['subcat' => Subcat::where('id', $request->input('id'))->select('id', 'enabled')->first()]);

    }

    public function city_on (Request $request) 
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:cities,id',
            'enabled' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages()->all(), 422);
        }

        City::where('id', $request->input('id'))
                ->update(['enabled' => $request->input('enabled')]);

        // return Manager::find($request->input('id'));
        return response()->json(['city' => City::where('id', $request->input('id'))->select('id', 'enabled')->first()]);

    }

}
