<?php

use App\Http\Controllers\ProductControler;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('products',  [ProductControler::class, 'show'])->name('product.show');
    Route::delete('products/{id}', [ProductControler::class, 'destroy'])->name('product.destroy');
});
