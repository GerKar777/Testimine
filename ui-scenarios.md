UI test scenarios – MiniShop

Precondition for all: fresh page (page.goto('/')), cart empty.

ID	REQ	Steps	Expected on screen	Type
UI-01	REQ-UI-01	Open /	Heading Products, 6 product cards, 6 products	smoke
UI-02	REQ-UI-02	Enter Mouse in search	1 product: Wireless Mouse	positive
UI-03	REQ-UI-02	Enter mouse in search	1 product: Wireless Mouse	regression
UI-04	REQ-UI-03	Add Laptop Stand to cart	Cart count is 1	positive
UI-05	REQ-UI-04	Add USB-C Hub, open Cart	1 cart row, Total 39.00 €	calculation
UI-06	REQ-UI-04	Add USB-C Hub twice, open Cart	Qty 2, Line total 78.00 €, Total 78.00 €	calculation
UI-07	REQ-UI-05	Add Webcam HD, open Cart, click Remove	Your cart is empty, Cart count 0	positive
UI-08	REQ-UI-06	Open Cart and submit empty checkout form	Three validation errors appear	negative
UI-09	REQ-UI-06	Enter name, email mari@, address; submit	Enter a valid email address; no confirmation	negative
UI-10	REQ-UI-07	Add Wireless Mouse, open Cart, enter valid details and submit	Confirmation contains Thank you, Mari Maasikas!; Cart count 0	positive
Requirements covered
REQ-UI-01: product list
REQ-UI-02: case-insensitive search
REQ-UI-03: add to cart and cart indicator
REQ-UI-04: quantity and totals
REQ-UI-05: remove product
REQ-UI-06: checkout form validation
REQ-UI-07: order confirmation