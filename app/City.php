<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\District;
use App\Provider;

class City extends Model
{
    public $timestamps = false;
    protected $fillable = ['district_id', 'name', 'enabled'];
    protected $hidden = [];

    public function district() {
    	return $this->belongsTo('App\District');
    }

    public function providers ()
    {
    	return $this->belongsToMany('App\Provider');
    }

}
