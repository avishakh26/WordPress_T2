import { useState } from 'react';
import { X, User, Phone, MapPin, CheckCircle, MapPinned, CreditCard, Banknote, Mail } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import bkashLogo from '../../assets/bkash_logo_custom.png';

const DELIVERY_CHARGES = { inside: 60, outside: 120 };

const CheckoutModal = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, cartTotal, setCartItems } = useCart();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '',
    location: '', paymentMethod: '',
    bkashNumber: '', bkashTxnId: '',
  });
  const [error, setError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryCharge = formData.location ? DELIVERY_CHARGES[formData.location] : 0;
  const grandTotal = cartTotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.location) {
      setError('Please fill in all fields including your delivery location.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.paymentMethod) { setError('Please select a payment method.'); return; }
    if (formData.paymentMethod === 'bkash' && (!formData.bkashNumber || !formData.bkashTxnId)) {
      setError('Please enter your bKash number and Transaction ID.'); return;
    }
    setOrderSuccess(true);
    setTimeout(() => {
      setCartItems([]);
      setOrderSuccess(false);
      setIsCheckoutOpen(false);
      setStep(1);
      setFormData({ name: '', phone: '', address: '', location: '', paymentMethod: '', bkashNumber: '', bkashTxnId: '' });
    }, 3500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setError('');
    setOrderSuccess(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[220] backdrop-blur-sm" onClick={handleClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white z-[230] shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="bg-primary text-white px-5 py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg font-bold font-montserrat flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {orderSuccess ? 'Order Confirmed! 🎉' : step === 1 ? 'Delivery Information' : 'Payment Method'}
            </h2>
            {!orderSuccess && <p className="text-orange-100 text-xs mt-0.5">Step {step} of 2</p>}
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-orange-600 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!orderSuccess && (
          <div className="flex h-1.5 shrink-0 bg-gray-200">
            <div className={`bg-primary transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
          </div>
        )}

        <div className="overflow-y-auto flex-1 p-5">

          {/* SUCCESS STATE */}
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Order Placed!</h3>
              <p className="text-gray-500 mb-4">Thank you, <strong>{formData.name}</strong>! We've received your order.</p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-full text-left text-sm space-y-2">
                <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>৳{cartTotal}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Delivery</span><span>৳{deliveryCharge}</span></div>
                <div className="flex justify-between font-bold text-primary text-base border-t pt-2 mt-1">
                  <span>Grand Total</span><span>৳{grandTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment</span>
                  <span className="font-medium">{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'bKash'}</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-4">We'll call {formData.phone} to confirm. Closing…</p>
            </div>

          ) : step === 1 ? (
            /* ─── STEP 1: DELIVERY INFO ─── */
            <>
              {/* Order Summary mini */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-5">
                <h3 className="font-semibold text-secondary mb-2 text-sm">Order Summary</h3>
                <div className="space-y-1 mb-3">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm text-gray-600">
                      <span className="truncate pr-4">{item.quantity}× {item.title}</span>
                      <span className="font-medium shrink-0">৳{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-2 text-sm space-y-1">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>৳{cartTotal}</span></div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span>{formData.location ? `৳${deliveryCharge}` : <em className="text-orange-400">Select below</em>}</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary text-base mt-1">
                    <span>Total</span><span>৳{grandTotal}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      placeholder="e.g. Rahim Ahmed" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      placeholder="017XXXXXXXX" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
                      placeholder="e.g. yourname@example.com" required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="2"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none transition"
                      placeholder="House, Road, Area, City" required />
                  </div>
                </div>

                {/* Location Picker */}
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
                    <MapPinned className="w-4 h-4 text-primary" /> Delivery Location
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setFormData(f => ({ ...f, location: 'inside' }))}
                      className={`border-2 rounded-xl p-3 text-center transition-all ${formData.location === 'inside' ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                      <div className={`font-bold text-sm ${formData.location === 'inside' ? 'text-primary' : 'text-secondary'}`}>Inside Dhaka</div>
                      <div className="text-xs text-gray-500">Delivery: <strong className={formData.location === 'inside' ? 'text-primary' : ''}>৳60</strong></div>
                    </button>
                    <button type="button" onClick={() => setFormData(f => ({ ...f, location: 'outside' }))}
                      className={`border-2 rounded-xl p-3 text-center transition-all ${formData.location === 'outside' ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                      <div className={`font-bold text-sm ${formData.location === 'outside' ? 'text-primary' : 'text-secondary'}`}>Outside Dhaka</div>
                      <div className="text-xs text-gray-500">Delivery: <strong className={formData.location === 'outside' ? 'text-primary' : ''}>৳120</strong></div>
                    </button>
                  </div>
                </div>

                <button type="submit"
                  className="w-full bg-primary hover:bg-primaryDark text-white py-3.5 rounded-xl font-bold text-base transition shadow-md">
                  Continue to Payment →
                </button>
              </form>
            </>

          ) : (
            /* ─── STEP 2: PAYMENT ─── */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1"><span>Subtotal</span><span>৳{cartTotal}</span></div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Delivery ({formData.location === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between font-bold text-primary text-lg border-t border-gray-200 pt-2 mt-2">
                  <span>Grand Total</span><span>৳{grandTotal}</span>
                </div>
              </div>

              {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-3">
                  <CreditCard className="w-4 h-4 text-primary" /> Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* COD */}
                  <button type="button"
                    onClick={() => setFormData(f => ({ ...f, paymentMethod: 'cod', bkashNumber: '', bkashTxnId: '' }))}
                    className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-orange-50' : 'border-gray-200 hover:border-orange-200'}`}>
                    <Banknote className={`w-8 h-8 ${formData.paymentMethod === 'cod' ? 'text-primary' : 'text-gray-400'}`} />
                    <div className={`font-bold text-sm ${formData.paymentMethod === 'cod' ? 'text-primary' : 'text-secondary'}`}>Cash on Delivery</div>
                    <div className="text-xs text-gray-400 text-center">Pay when you receive your order</div>
                  </button>

                  {/* bKash */}
                  <button type="button"
                    onClick={() => setFormData(f => ({ ...f, paymentMethod: 'bkash' }))}
                    className={`border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.paymentMethod === 'bkash' ? 'border-[#E2136E] bg-pink-50' : 'border-gray-200 hover:border-pink-200'}`}>
                    <img src={bkashLogo} alt="bKash Logo" className="w-10 h-10 object-cover rounded shadow-sm" />
                    <div className="text-xs text-gray-400 text-center">Mobile banking payment</div>
                  </button>
                </div>
              </div>

              {/* bKash Details */}
              {formData.paymentMethod === 'bkash' && (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-pink-700 font-medium bg-pink-100 rounded-lg p-2">
                    <span>📱</span> Send payment to: <strong>01XXXXXXXXX</strong> (Merchant)
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Your bKash Number</label>
                    <input type="tel" name="bkashNumber" value={formData.bkashNumber} onChange={handleChange}
                      className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-sm"
                      placeholder="01XXXXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Transaction ID (TxnID)</label>
                    <input type="text" name="bkashTxnId" value={formData.bkashTxnId} onChange={handleChange}
                      className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none text-sm"
                      placeholder="e.g. AB12345678" />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setStep(1); setError(''); }}
                  className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                  ← Back
                </button>
                <button type="submit"
                  className="flex-1 bg-primary hover:bg-primaryDark text-white py-3 rounded-xl font-bold transition shadow-md">
                  Place Order ✓
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
