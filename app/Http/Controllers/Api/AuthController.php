<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Hash;
use Validator;
use App\User;

class AuthController extends Controller
{
    // use AuthenticatesAndRegistersUsers, ThrottlesLogins; // ?

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            // 'email' => 'required_without:name|email|max:255',
            'password' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages()->all(), 401);
            // return response()->json(['msg' => 'false'], 401);
            // return response()->json($validator->messages(), 422);
        }

        if ((!$user = User::where('name', $request->input('name'))->first()) || 
            // (!$user = User::where('email', $request->input('email'))->first()) ||
            (!Hash::check($request->input('password'), $user->password))) {
            return response()->json([trans('messages.unauthorized')], 401);
        }

        $user->api_token = $this->new_token();
        $user->save();

        return response()->json([
            'api_token' => $user->api_token,
            'username' => $user->name,
        ]);
    }

    /**
     * Иммитируем апи регистрации ... проверяем ввод, затем создаем пользователя и записи card и setting
     */
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:5|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'api_token' => $this->new_token(),
            // 'api_token' => str_random(60),
            'password' => bcrypt($request->input('password')),
        ]);

        return response()->json([
            'api_token' => $user->api_token,
        ]);
    }

    public function logout (Request $request)
    {
        $user = Auth::guard('api')->user();
        // $user->api_token = $this->new_token();
        $user->api_token = null;
        $user->save();
        return 'ok';
    }

    protected function new_token() 
    {
        $new_token = '';
        while ($new_token == '') {
            $new_token = str_random(60);
            $token_validator = Validator::make(['api_token' => $new_token], [
                'api_token' => 'required|unique:users',
            ]);
            
            if ($token_validator->fails()) {
                $new_token = '';
            } 
        }

        return $new_token;
    }

}
