<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('user_id', auth()->user()->id)->get();
        return response()->json(['message' => 'All Product Founded', 'data' => $products], 200);
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

        $product = Product::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock
        ]);

        return response()->json([
            'message' => 'Product Successfully Added',
            'data' => $product
        ], 200);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (empty($product)) {
            return response()->json([
                'message' => 'Product Not Found',
            ], 404);
        } else {
            return $product->user_id === auth()->user()->id ?
                response()->json([
                    'message' => 'Product Successfully Founded',
                    'data' => $product
                ], 200) : response()->json([
                            'message' => 'Access Forbidden',
                        ], 403);
        }
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Access Forbidden',
            ], 403);
        } else if (!empty($product)) {
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
                'message' => 'Product Successfully Updated',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Product Not Found',
            ], 404);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product->user_id !== auth()->user()->id) {
            return response()->json([
                'message' => 'Access Forbidden',
            ], 403);
        } else if (!empty($product)) {
            $product->delete();

            return response()->json([
                'message' => 'Product Successfully Deleted'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Product Not Found',
            ], 404);
        }
    }
}