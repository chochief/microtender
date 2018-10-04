<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Tender;

class Recipient extends Model
{
    public $timestamps = false;
    protected $fillable = ['tender_id', 'manager_id', 'provider_id', 'email', 'surname', 'name', 'middle_name', 'company'];

    public function tender ()
    {
    	return $this->belongsTo('App\Tender');
    }
}
