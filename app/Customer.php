<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Tender;

class Customer extends Model
{
    protected $fillable = ['tender_id', 'name', 'email', 'phone'];

    public function tender ()
    {
    	return $this->belongsTo('App\Tender');
    }
}
