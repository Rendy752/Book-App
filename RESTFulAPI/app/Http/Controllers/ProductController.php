<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json(['data' => $products], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required | numeric | min:1000',
            'stock' => 'required | numeric | min:0',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Request Body Error',
                'error' => $validator->errors()
            ], 422);

        $product = Product::create($request->all());

        return response()->json([
            'message' => 'Product Successfully Added',
            'data' => $product
        ], 200);
    }

    public function show($id)
    {
        $product = Product::find($id);
        return empty($product) ?
            response()->json([
                'message' => 'Product not found',
            ], 404) :
            response()->json([
                'message' => 'Product found',
                'data' => $product
            ], 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            $validator = Validator::make($request->all(), [
                'price' => 'numeric | min:1000',
                'stock' => 'numeric | min:0',
            ]);

            if ($validator->fails())
                return response()->json([
                    'message' => 'Request Body Error',
                    'error' => $validator->errors()
                ], 422);

            $product->update($request->all());

            return response()->json([
                'message' => 'Product updated',
            ], 202);
        } else {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!empty($product)) {
            $product->delete();

            return response()->json([
                'message' => 'Product deleted'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }
    }
}