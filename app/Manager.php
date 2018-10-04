<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use DB;
use App\Provider;
use App\City;
use App\Subcat;

class Manager extends Model
{
    protected $fillable = ['enabled', 'provider_id', 'surname', 'name', 'middle_name', 'post', 'email', 'phone', 'mobile', 'company', 'inn', 'address', 'site', 'description'];

    public function provider()
    {
    	return $this->belongsTo('App\Provider');
    }

    // public static function managers ($providers)
    // {
    // 	// if (!isset($providers)) return [];

    // 	$resault = DB::table('managers')
    //                  ->join('providers', 'managers.provider_id', '=', 'providers.id')
    //                  ->select('email', 'surname', 'name', 'middle_name', 'providers.company', 'providers.id as provider_id', 'managers.id as manager_id')
    //                  ->whereIn('provider_id', $providers)
    //                  ->where('managers.enabled', 1)
    // 				 ->get();

    // 	return $resault;
    // }

    public function cities ()
    {
        return $this->belongsToMany('App\City');
    }

    public function subcats ()
    {
        return $this->belongsToMany('App\Subcat');
    }

    public static function managersFor ($city_id, $subcat_id) {

        if (!isset($city_id) || !isset($subcat_id)) return;

        $in_city = DB::table('city_manager')
                     ->where('city_id', $city_id)
                     ->select('manager_id')
                     ->get()
                     ->pluck('manager_id');

        $in_city_cat = DB::table('manager_subcat')
                         ->where('subcat_id', $subcat_id)
                         ->whereIn('manager_id', $in_city)
                         ->select('manager_id')
                         ->get()
                         ->pluck('manager_id');

        // $resault = $in_city_cat;
        $resault = DB::table('managers')
                     ->whereIn('id', $in_city_cat)
                     ->select('email', 'surname', 'name', 'middle_name', 'company', 'id')
                     ->get();

        return $resault;
    }

}
