
Precondition for all: fresh page (page.goto('/')), cart empty.

| ID | REQ | Steps | Expected on screen | Type |
|---|---|---|---|---|
| UI-01 | REQ-UI-01 | open / | heading 'Products', 6 product cards, '6 products' | smoke |
| UI-02 | REQ-UI-02 | search 'Mouse' | 1 product: Wireless Mouse | happy path |
| UI-03 | REQ-UI-02 | search 'mouse' (lower case) | 1 product: Wireless Mouse | happy path |
| UI-04 | REQ-UI-03 | click 'Add Laptop Stand to cart' | cart badge shows '1' | happy path |
| UI-05 | REQ-UI-04 | add 'USB-C Hub', open Cart | 1 row, total '39.00 €' | happy path |
| UI-06 | REQ-UI-04 | add 'USB-C Hub' 2x, open Cart | Qty '2', Line total '78.00 €', Total '78.00 €' | boundary |
| UI-07 | REQ-UI-05 | add 'Webcam HD', open Cart, click Remove | 'Your cart is empty', badge '0' | happy path |
| UI-08 | REQ-UI-06 | open Cart, click Place order without filling fields | 3 error messages under input fields | negative |
| UI-09 | REQ-UI-06 | open Cart, fill Name, Email 'mari@', Address, click Place order | 'Enter a valid email address' | negative |
| UI-10 | REQ-UI-07 | add product, open Cart, fill valid form, click Place order | 'Thank you, Mari Maasikas! Order #1 confirmed.', badge '0' | happy path |