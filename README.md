responsive-tables
=================

A Responsive, Paginated Table Solution

Why?

I've been looking at tables in responsive design for some time. This concept has been floating around for a while now - JQuery Mobile uses the technique of inserting a small element in to the table. What I wasn't so keen on was the table presentation in linear format, where a user has to scroll for miles to see the table details. So, I took the jQuery Mobile concept, and paginated the table at smaller screen.
The Code

You can grab the code, and this demo on github. Feel free to use it however you please. It's open source, and released under a creative commons licence - see the licence details below.

Installation and Setup

Include the plugin file on your page, ( with jQuery ) - call it ike so:


jQuery('.resp-table').repTable({});


Options

headElements - specify what the table head elements are - default = 'thead tr'

bodyElements - specify what the table bosy elements are - default - 'tbody tr'

headingTagOpen - choose the mark-up that will be inserted into each cell as a title at smaller screen - default = '<b class ="rt-ss-label">'

headingTagClose - to close headingTagOpen

breakPoint - specify the breakpoint that you wish to see the table switch to smaller screen at - default = 640px

paginate - choose whether to paginate, or not - your choice - default = true

paginateThreshold  - How many items per 'page' - default = 5

pagerClass -  class of the pager element on the page - default = 'pager'

addRowCount - do you wish the row count to be displayed as a visual aid to users ? - default = true


Enjoy!
