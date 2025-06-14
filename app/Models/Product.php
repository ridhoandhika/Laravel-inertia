<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';       // UUID is string
    public $incrementing = false;        // Disable auto-increment

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'file'
    ];
     
}
