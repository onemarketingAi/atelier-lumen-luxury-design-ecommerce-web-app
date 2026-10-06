"""
Atelier Lumen — Python Flask Backend & API Server
Full REST endpoints for E-Commerce: Catalog, PDP, Orders, Checkout, Seller Chat, and Auth.
"""

from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import datetime
import random
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# In-memory database of curated products
PRODUCTS = [
    {
        "id": "acoustic-horizon-s1",
        "name": "Acoustic Horizon S1 Headphones",
        "subtitle": "Planar Magnetic Over-Ear Studio Monitors",
        "category": "audio",
        "category_label": "Audio Hardware",
        "price": 495,
        "original_price": 550,
        "rating": 4.9,
        "reviews_count": 42,
        "in_stock": True,
        "stock_count": 8,
        "images": [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&auto=format&fit=crop&q=80"
        ],
        "variants": [
            {"id": "obsidian-brass", "name": "Obsidian & Brushed Brass", "color_hex": "#1c1917"},
            {"id": "raw-titanium", "name": "Raw Titanium Grey", "color_hex": "#78716c"}
        ],
        "description": "Precision-tuned planar magnetic transducers paired with milled aerospace aluminum and full-grain headband cushioning.",
        "specs": {
            "Transducer": "Planar Magnetic (50mm)",
            "Frequency Response": "10 Hz – 45,000 Hz",
            "Impedance": "32 Ohms at 1kHz",
            "Weight": "365 grams"
        },
        "materials": "CNC 6061 Aluminum, Raw Brass, Italian Lambskin Leather",
        "warranty": "5-Year Manufacturer Warranty",
        "sku": "AL-AUD-0101"
    },
    {
        "id": "lumen-eclipse-lamp",
        "name": "Lumen Eclipse Table Lamp",
        "subtitle": "Sculptural Solid Brass & Smoked Glass Luminaire",
        "category": "lighting",
        "category_label": "Sculptural Lighting",
        "price": 380,
        "rating": 4.8,
        "reviews_count": 31,
        "in_stock": True,
        "stock_count": 12,
        "images": [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&auto=format&fit=crop&q=80"
        ],
        "variants": [
            {"id": "brushed-brass", "name": "Brushed Satin Brass", "color_hex": "#d97706"},
            {"id": "patinated-bronze", "name": "Patinated Dark Bronze", "color_hex": "#451a03"}
        ],
        "description": "An architectural table lamp cast from solid brass with mouth-blown smoked glass diffuser casting warm 2200K sunset light.",
        "specs": {
            "Light Output": "650 Lumens",
            "Color Temp": "2200K – 2700K Warm Dimming",
            "Height": "380 mm",
            "Base": "Solid Brass (4.2 kg)"
        },
        "materials": "Solid Virgin Brass, Hand-Blown Smoked Glass",
        "warranty": "10-Year Structural Guarantee",
        "sku": "AL-LGT-0202"
    },
    {
        "id": "chronos-calibre-04",
        "name": "Chronos Calibre 04 Chronograph",
        "subtitle": "Grade 5 Titanium Automatic Watch",
        "category": "horology",
        "category_label": "Horology",
        "price": 1250,
        "original_price": 1400,
        "rating": 5.0,
        "reviews_count": 19,
        "in_stock": True,
        "stock_count": 4,
        "images": [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop&q=80"
        ],
        "variants": [
            {"id": "slate-leather", "name": "Slate Dial / Tuscan Calf Leather", "color_hex": "#44403c"},
            {"id": "titanium-mesh", "name": "Integrated Titanium Mesh Bracelet", "color_hex": "#a8a29e"}
        ],
        "description": "An architectural mechanical chronograph in satin Grade 5 titanium, double-domed sapphire, and 68-hour power reserve.",
        "specs": {
            "Case Diameter": "39.5 mm",
            "Movement": "Swiss Automatic Mechanical Calibre, 27 Jewels",
            "Water Resistance": "100m (10 ATM)",
            "Power Reserve": "68 Hours"
        },
        "materials": "Grade 5 Titanium, Sapphire Crystal, Tuscan Calfskin",
        "warranty": "5-Year International Atelier Warranty",
        "sku": "AL-HOR-0303"
    },
    {
        "id": "siena-weekender-bag",
        "name": "Siena Full-Grain Leather Weekender",
        "subtitle": "Hand-Stitched Italian Vachetta Carryall",
        "category": "leather",
        "category_label": "Leather & Travel",
        "price": 640,
        "rating": 4.9,
        "reviews_count": 28,
        "in_stock": True,
        "stock_count": 9,
        "images": [
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=1200&auto=format&fit=crop&q=80"
        ],
        "variants": [
            {"id": "cognac-tan", "name": "Aged Cognac Tan", "color_hex": "#78350f"},
            {"id": "nero-black", "name": "Nero Black Oil Finish", "color_hex": "#18181b"}
        ],
        "description": "A spacious travel holdall crafted from vegetable-tanned Tuscan leather, solid antique brass hardware, and heavy cotton lining.",
        "specs": {
            "Capacity": "42 Liters",
            "Dimensions": "520mm × 280mm × 300mm",
            "Weight": "1.85 kg",
            "Hardware": "Milled Solid Brass"
        },
        "materials": "Vegetable-Tanned Tuscan Cowhide, Solid Brass, Waxed Canvas",
        "warranty": "Lifetime Craftsmanship Guarantee",
        "sku": "AL-LEA-0404"
    },
    {
        "id": "wabi-kuro-vessel",
        "name": "Kuro Terracotta Ceramic Vessel",
        "subtitle": "Wood-Fired Artisanal Amphora Vase",
        "category": "living",
        "category_label": "Artisanal Living",
        "price": 210,
        "original_price": 245,
        "rating": 4.7,
        "reviews_count": 16,
        "in_stock": True,
        "stock_count": 15,
        "images": [
            "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&auto=format&fit=crop&q=80"
        ],
        "variants": [
            {"id": "charcoal-ash", "name": "Charcoal Pit-Fired Matte", "color_hex": "#262626"},
            {"id": "raw-terracotta", "name": "Unglazed Red Clay Ochre", "color_hex": "#9a3412"}
        ],
        "description": "Wheel-thrown high-iron stoneware fired in an anagama wood kiln for 72 hours in Shigaraki, Japan.",
        "specs": {
            "Height": "320 mm",
            "Diameter": "210 mm",
            "Origin": "Shigaraki, Japan",
            "Firing": "Wood Kiln 1,280°C"
        },
        "materials": "High-Iron Stoneware Clay, Natural Pine Ash Glaze",
        "warranty": "Certificate of Provenance & Safe Delivery",
        "sku": "AL-LIV-0505"
    }
]

# In-memory orders database
ORDERS = [
    {
        "id": "LUM-94821",
        "date": "2026-09-28",
        "items": [
            {"name": "Lumen Eclipse Table Lamp", "price": 380, "qty": 1, "variant": "Brushed Satin Brass"}
        ],
        "total": 372.78,
        "status": "Delivered",
        "tracking_number": "1Z9999999298372",
        "estimated_delivery": "Delivered Oct 2, 2026"
    }
]

# Chat messages
CHAT_MESSAGES = [
    {
        "id": "msg-1",
        "sender": "seller",
        "text": "Greetings. I am Marcus, atelier keeper and master artisan at Lumen. How may I assist you with our craft, materials, or custom orders today?",
        "timestamp": "10:00 AM"
    }
]

# ======================== API ROUTES ========================

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category', 'all')
    search = request.args.get('q', '').strip().lower()
    sort_by = request.args.get('sort', 'featured')

    results = PRODUCTS

    if category != 'all':
        results = [p for p in results if p['category'] == category]

    if search:
        results = [p for p in results if search in p['name'].lower() or search in p['description'].lower() or search in p['category_label'].lower()]

    if sort_by == 'price-asc':
        results = sorted(results, key=lambda x: x['price'])
    elif sort_by == 'price-desc':
        results = sorted(results, key=lambda x: x['price'], reverse=True)
    elif sort_by == 'rating':
        results = sorted(results, key=lambda x: x['rating'], reverse=True)

    return jsonify({"products": results, "total": len(results)})

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json or {}
    items = data.get('items', [])
    shipping = data.get('shipping', {})
    payment_method = data.get('payment_method', 'Credit Card')
    discount = data.get('discount', 0)

    if not items:
        return jsonify({"error": "Bag is empty"}), 400

    subtotal = sum(item.get('price', 0) * item.get('qty', 1) for item in items)
    shipping_cost = 0 if subtotal >= 150 else 25
    tax = round((subtotal - discount) * 0.0825, 2)
    total = max(0, round(subtotal - discount + shipping_cost + tax, 2))

    order_num = random.randint(10000, 99999)
    order_id = f"LUM-{order_num}"

    new_order = {
        "id": order_id,
        "date": datetime.date.today().isoformat(),
        "items": items,
        "subtotal": subtotal,
        "shipping_cost": shipping_cost,
        "discount": discount,
        "tax": tax,
        "total": total,
        "status": "Processing",
        "shipping_address": shipping,
        "payment_method": payment_method,
        "tracking_number": f"1Z999999{order_num}",
        "estimated_delivery": "3–5 Business Days"
    }

    ORDERS.insert(0, new_order)
    return jsonify({"success": True, "order": new_order})

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    order = next((o for o in ORDERS if o['id'] == order_id), None)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify(order)

@app.route('/api/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'GET':
        return jsonify({"messages": CHAT_MESSAGES})

    data = request.json or {}
    user_text = data.get('text', '').strip()
    if not user_text:
        return jsonify({"error": "Empty message"}), 400

    time_str = datetime.datetime.now().strftime("%I:%M %p")
    user_msg = {
        "id": f"msg-{len(CHAT_MESSAGES)+1}",
        "sender": "user",
        "text": user_text,
        "timestamp": time_str
    }
    CHAT_MESSAGES.append(user_msg)

    # Intelligent seller auto-response
    lower = user_text.lower()
    if 'shipping' in lower or 'delivery' in lower:
        reply = "We offer complimentary insured courier dispatch on all commissions over $150. Domestic orders reach clients within 3 to 5 business days."
    elif 'stock' in lower or 'available' in lower:
        reply = "Our current numbered batch items are available in the studio bench. Custom commissions take roughly 2 weeks to cast and assemble."
    elif 'discount' in lower or 'code' in lower or 'promo' in lower:
        reply = "You may apply code 'WELCOME10' at checkout to receive 10% off your initial studio order."
    elif 'return' in lower or 'trial' in lower:
        reply = "Every piece carries our 5-year structural guarantee, plus a 30-day in-home trial. Return shipping is fully accommodated if not harmonious."
    else:
        reply = "Thank you for inquiring. I am personally monitoring the studio and will assist with your exact specifications."

    seller_msg = {
        "id": f"msg-{len(CHAT_MESSAGES)+2}",
        "sender": "seller",
        "text": reply,
        "timestamp": time_str
    }
    CHAT_MESSAGES.append(seller_msg)

    return jsonify({"success": True, "messages": [user_msg, seller_msg]})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email', '')
    return jsonify({
        "success": True,
        "user": {
            "name": email.split('@')[0].capitalize(),
            "email": email,
            "tier": "Atelier Collector"
        }
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
