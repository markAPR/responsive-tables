responsive-tables
=================

<h4>A Responsive, Paginated Table Solution</h4>

<h4>Why?</h4>

I've been looking at tables in responsive design for some time. This concept has been floating around for a while now - JQuery Mobile uses the technique of inserting a small element in to the table. What I wasn't so keen on was the table presentation in linear format, where a user has to scroll for miles to see the table details. So, I took the jQuery Mobile concept, and paginated the table at smaller screen.
The Code

You can grab the code, and this demo on github. Feel free to use it however you please. It's open source, and released under a creative commons licence - see the licence details below.

<h4>Installation and Setup</h4>

Include the plugin file on your page, ( with jQuery ) - call it ike so:


jQuery('.resp-table').repTable({});


<h4>Options</h4>

<strong>headElements</strong> - specify what the table head elements are - default = 'thead tr'

<strong>bodyElements</strong> - specify what the table bosy elements are - default - 'tbody tr'

<strong>headingTagOpen</strong> - choose the mark-up that will be inserted into each cell as a title at smaller screen - default = '<b class ="rt-ss-label">'

<strong>headingTagClose</strong> - to close headingTagOpen

<strong>breakPoint</strong> - specify the breakpoint that you wish to see the table switch to smaller screen at - default = 640px

<strong>paginate</strong> - choose whether to paginate, or not - your choice - default = true

<strong>paginateThreshold</strong>  - How many items per 'page' - default = 5

<strong>pagerClass</strong> -  class of the pager element on the page - default = 'pager'

<strong>addRowCount</strong> - do you wish the row count to be displayed as a visual aid to users ? - default = true


Enjoy!
