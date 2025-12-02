// export default function DialogModal(){
//     return(
//         <div>
//             <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
//                     <DialogTrigger asChild>
//                       <Button size="lg" className="flex-1" >
//                         <ShoppingCart className="mr-2 h-5 w-5" />
//                         Buy Now - ${(product.price * quantity).toLocaleString()}
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//                       {!orderComplete ? (
//                         <>
//                           <DialogHeader>
//                             <DialogTitle>Checkout</DialogTitle>
//                             <DialogDescription>Complete your purchase securely</DialogDescription>
//                           </DialogHeader>

//                           {/* Checkout Steps Indicator */}
//                           <div className="flex items-center justify-between mb-6 mt-4">
//                             {["Shipping", "Payment", "Review"].map((step, index) => (
//                               <div key={step} className="flex items-center">
//                                 <div
//                                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                                     checkoutStep > index + 1
//                                       ? "bg-primary text-primary-foreground"
//                                       : checkoutStep === index + 1
//                                         ? "bg-primary text-primary-foreground"
//                                         : "bg-secondary text-muted-foreground"
//                                   }`}
//                                 >
//                                   {checkoutStep > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
//                                 </div>
//                                 <span className="ml-2 text-sm hidden sm:inline">{step}</span>
//                                 {index < 2 && <div className="w-8 sm:w-16 h-0.5 bg-border mx-2" />}
//                               </div>
//                             ))}
//                           </div>

//                           {/* Step 1: Shipping */}
//                           {checkoutStep === 1 && (
//                             <div className="space-y-4">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <Label htmlFor="firstName">First Name</Label>
//                                   <Input id="firstName" placeholder="John" className="mt-1" />
//                                 </div>
//                                 <div>
//                                   <Label htmlFor="lastName">Last Name</Label>
//                                   <Input id="lastName" placeholder="Doe" className="mt-1" />
//                                 </div>
//                               </div>
//                               <div>
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
//                               </div>
//                               <div>
//                                 <Label htmlFor="address">Address</Label>
//                                 <Input id="address" placeholder="123 Innovation Ave" className="mt-1" />
//                               </div>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <Label htmlFor="city">City</Label>
//                                   <Input id="city" placeholder="Kigali" className="mt-1" />
//                                 </div>
//                                 <div>
//                                   <Label htmlFor="country">Country</Label>
//                                   <Input id="country" placeholder="Rwanda" className="mt-1" />
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Step 2: Payment */}
//                           {checkoutStep === 2 && (
//                             <div className="space-y-4">
//                               <div className="p-4 bg-secondary/50 rounded-lg flex items-center gap-3">
//                                 <Lock className="h-5 w-5 text-primary" />
//                                 <span className="text-sm text-muted-foreground">
//                                   Your payment information is encrypted and secure
//                                 </span>
//                               </div>
//                               <div>
//                                 <Label htmlFor="cardNumber">Card Number</Label>
//                                 <Input id="cardNumber" placeholder="4242 4242 4242 4242" className="mt-1" />
//                               </div>
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <Label htmlFor="expiry">Expiry Date</Label>
//                                   <Input id="expiry" placeholder="MM/YY" className="mt-1" />
//                                 </div>
//                                 <div>
//                                   <Label htmlFor="cvc">CVC</Label>
//                                   <Input id="cvc" placeholder="123" className="mt-1" />
//                                 </div>
//                               </div>
//                               <div>
//                                 <Label htmlFor="cardName">Name on Card</Label>
//                                 <Input id="cardName" placeholder="John Doe" className="mt-1" />
//                               </div>
//                             </div>
//                           )}

//                           {/* Step 3: Review */}
//                           {checkoutStep === 3 && (
//                             <div className="space-y-4">
//                               <div className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
//                                 <img
//                                   src={product.image || "/placeholder.svg"}
//                                   alt={product.name}
//                                   className="w-20 h-20 rounded-lg object-cover"
//                                 />
//                                 <div className="flex-1">
//                                   <h4 className="font-semibold text-foreground">{product.name}</h4>
//                                   <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
//                                   <p className="text-primary font-semibold mt-1">
//                                     ${(product.price * quantity).toLocaleString()}
//                                   </p>
//                                 </div>
//                               </div>

//                               <Separator />

//                               <div className="space-y-2 text-sm">
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Subtotal</span>
//                                   <span>${subtotal.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Shipping</span>
//                                   <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                   <span className="text-muted-foreground">Tax (18%)</span>
//                                   <span>${tax.toFixed(2)}</span>
//                                 </div>
//                                 <Separator />
//                                 <div className="flex justify-between font-semibold text-lg">
//                                   <span>Total</span>
//                                   <span className="text-primary">${total.toFixed(2)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           <div className="flex gap-3 mt-6">
//                             {checkoutStep > 1 && (
//                               <Button
//                                 variant="outline"
//                                 onClick={() => setCheckoutStep(checkoutStep - 1)}
//                                 className="flex-1"
//                               >
//                                 Back
//                               </Button>
//                             )}
//                             <Button onClick={handleCheckout} className="flex-1">
//                               {checkoutStep === 3 ? (
//                                 <>
//                                   <CreditCard className="mr-2 h-4 w-4" />
//                                   Pay ${total.toFixed(2)}
//                                 </>
//                               ) : (
//                                 "Continue"
//                               )}
//                             </Button>
//                           </div>
//                         </>
//                       ) : (
//                         <div className="text-center py-8">
//                           <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                             <CheckCircle className="h-8 w-8 text-green-600" />
//                           </div>
//                           <h3 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h3>
//                           <p className="text-muted-foreground mb-6">
//                             Thank you for your purchase. You will receive an email confirmation shortly.
//                           </p>
//                           <div className="p-4 bg-secondary/50 rounded-lg text-left mb-6">
//                             <p className="text-sm text-muted-foreground">Order Number</p>
//                             <p className="font-semibold text-foreground">NL-{Date.now().toString().slice(-8)}</p>
//                           </div>
//                           <Button
//                             onClick={() => {
//                               setIsCheckoutOpen(false)
//                               setOrderComplete(false)
//                               setCheckoutStep(1)
//                             }}
//                           >
//                             Continue Shopping
//                           </Button>
//                         </div>
//                       )}
//                     </DialogContent>
//                   </Dialog>
//         </div>
//     )
// }