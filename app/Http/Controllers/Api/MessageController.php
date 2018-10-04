<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Validator;
use App\Message;

use Auth;

class MessageController extends Controller
{
    /** all messages **/
    public function index (Request $request)
    {
    	// $user = Auth::guard('api')->user();
    	return response()->json(['messages' => Message::orderBy('created_at', 'desc')->get()]);
    }

    /** new message **/
    public function create (Request $request)
    {
    	$validator = Validator::make($request->all(), [
    		'name' => 'string|max:100',
    		'email' => 'email|max:100',
    		'phone' => 'string|max:100',
    		'text' => 'required|string|max:10000',
    	]);

    	if ($validator->fails()) {
    		return response()->json($validator->messages()->all(), 422);
    	}

    	Message::create([
    		'name' => $request->input('name'),
    		'email' => $request->input('email'),
    		'phone' => $request->input('phone'),
    		'text' => $request->input('text'),
    	]);

    	return 'ok';
    }
}
