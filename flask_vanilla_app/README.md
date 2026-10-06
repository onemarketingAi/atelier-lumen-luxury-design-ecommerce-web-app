# Atelier Lumen — Python (Flask) & Pure Vanilla HTML5/CSS3/JS

This is the standalone **Python (Flask)** and **Pure Vanilla HTML5, CSS3, and JavaScript** implementation of the E-Commerce application.

## Directory Structure

```
flask_vanilla_app/
├── app.py                # Python Flask REST API & Web Server
├── requirements.txt      # Python dependencies (Flask, Flask-CORS)
├── templates/
│   └── index.html        # Pure Vanilla HTML5 with full-size slider & swipe widget
└── static/
    ├── css/
    │   └── style.css     # Pure Vanilla CSS3 (Custom properties, transitions)
    └── js/
        └── app.js        # Pure Vanilla JavaScript (Slider, Cart, PDP, Chat)
```

## How to Run

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Flask server:**
   ```bash
   python app.py
   ```

3. **Open in browser:**
   ```
   http://127.0.0.1:5000
   ```

## Key Features Included

- **Full-Size Image Slider with No Text**: 5-image vertical slider with smooth top-to-bottom slide transitions.
- **Bottom-Right Swipe Controller**: Up/Down chevron arrows, vertical slide indicator pills, and touch/drag swipe support.
- **Catalog & Filter Bar**: Filter by category (Audio, Lighting, Horology, Leather, Living) and real-time search.
- **Single Product Detail Modal (PDP)**: Detailed specifications, Add to Bag, Buy Now, and direct "Inquire with Artisan" button.
- **Slide-over Shopping Bag**: Live subtotal calculations and quantity updates.
- **Checkout Modal**: Shipping details, payment method selection, and order confirmation.
- **Live Seller Chat Widget**: Real-time conversation with Marcus Vance (the master artisan) with automated replies for shipping, stock, warranties, and product inquiries.
- **REST API Endpoints**:
  - `GET /api/products`
  - `GET /api/products/<id>`
  - `POST /api/orders`
  - `GET /api/orders/<id>`
  - `GET & POST /api/chat`
  - `POST /api/auth/login`
