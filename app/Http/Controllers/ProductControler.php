<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;

class ProductControler extends Controller
{
    // php artisan make:migration create_products_table

     /**
     * Show the product's page.
     */
    public function show(): Response
    {
         $products = Product::all();
        return Inertia::render('products/index', [
            'products' => $products
        ]);
    }

        /**
     * Delete the product's account.
     */
 
    public function destroy(Request $request, $id): RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Produk berhasil dihapus.');
    }

}
