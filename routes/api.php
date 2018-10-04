<?php

// use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');

// Route::group(['prefix' => 'api', 'namespace' => 'Api', 'middleware' => 'throttle:3,2'], function () {
	// throttle:3,2 т.е. есть 3 попытки в минуту и ждать потом 2 минуты

Route::get('data', 'DataController@load');
Route::post('subcat_on', 'DataController@subcat_on')->middleware(['auth:api']);
Route::post('city_on', 'DataController@city_on')->middleware(['auth:api']);

Route::post('tender', 'TenderController@load')->middleware(['throttle:3,1']);
Route::get('tenders', 'TenderController@index')->middleware(['auth:api']);

Route::post('signin', 'AuthController@login')->middleware(['throttle:3,1']);

Route::post('signup', 'AuthController@signup')->middleware(['auth:api']);
Route::post('logout', 'AuthController@logout')->middleware(['auth:api']);

Route::get('messages', 'MessageController@index')->middleware(['auth:api']);
Route::post('messages', 'MessageController@create')->middleware(['throttle:3,1']);

Route::post('manager', 'ManagerController@load')->middleware(['throttle:3,1']);
Route::get('manager', 'ManagerController@index')->middleware(['auth:api']);
Route::post('manager_on', 'ManagerController@manager_on')->middleware(['auth:api']);
Route::post('manager_update', 'ManagerController@update')->middleware(['auth:api']);
Route::post('manager_delete', 'ManagerController@delete')->middleware(['auth:api']);
// Route::patch('manager', 'ManagerController@edit')->middlewarupdatee(['auth:api']);
