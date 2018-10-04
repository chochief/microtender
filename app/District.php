<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\City;

class District extends Model
{
    public $timestamps = false;
    protected $fillable = ['name'];

    public function cities() {
    	return $this->hasMany('App\City');
    }
}
