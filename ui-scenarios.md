# UI test scenarios – MiniShop
 
Precondition for all: fresh page (page.goto('/')), cart empty.
 
| ID | REQ | Steps | Expected on screen | Type |
|---|---|---|---|---|
| UI-01 | REQ-UI-01 | open / | heading 'Products', 6 product cards, '6 products' | smoke |
| UI-02 | REQ-UI-02 | write 'Mouse' in search field | 1 product card: Wireless Mouse | positive |
| UI-03 | REQ-UI-02 | write 'mouse' in search field | 1 product card: Wireless Mouse | negative* |
| UI-04 | REQ-UI-03 | click 'Add Laptop Stand to cart' | cart badge shows '1' | positive |
| UI-05 | REQ-UI-04 | click 'Add USB-C Hub to cart', open Cart | 1 row in cart, Total '39.00 €' | positive |
| UI-06 | REQ-UI-04 | click 'Add USB-C Hub to cart' twice, open Cart | Qty '2', Line total '78.00 €', Total '78.00 €' | calculation |
| UI-07 | REQ-UI-05 | click 'Add Webcam HD to cart', open Cart, click 'Remove Webcam HD' | text 'Your cart is empty', cart badge shows '0' | positive |
| UI-08 | REQ-UI-06 | open Cart, click 'Place order' button with empty form | 3 error messages visible under fields | positive |
| UI-09 | REQ-UI-06 | open Cart, fill Name, fill Email with 'mari@', fill Address, click 'Place order' | error text 'Enter a valid email address' | negative* |
| UI-10 | REQ-UI-07 | click 'Add Wireless Mouse to cart', open Cart, fill form with valid data, click 'Place order' | text 'Thank you, Mari Maasikas! Order #1 confirmed.', cart badge shows '0' | happy path |