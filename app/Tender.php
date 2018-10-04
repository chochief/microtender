<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Customer;
use App\Recipient;

class Tender extends Model
{
    protected $fillable = ['city_id', 'category_id', 'city', 'category', 'text', 'budjet', 'price'];

    public function customer ()
    {
    	return $this->hasOne('App\Customer');
    }

    public function recipients ()
    {
    	return $this->hasMany('App\Recipient');
    }
}
