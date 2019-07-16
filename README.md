# css-transition
a simple css transiton impelement.

## example 
see `app.html`

## api

`cssTransition#enter`

 arg | type | desc | required
-----|------|------|---------
| node | HTMLElement | html element to be transtioned | true |
| enterAnimtation | string | classname added in the begging | true |
| active | string, boolean | active classname | false |
| timeout | number | set a timer (in ms) to cleanup any way | false |

`cssTransition#exit`

 arg | type | desc | required
-----|------|------|---------
| node | HTMLElement | html element to be transtioned | true |
| exitAnimation | string | classname added in the begging | true |
| active | string, boolean | active classname | false |
| timeout | number | set a timer (in ms) to cleanup any way | false |
| onExited | (done: () => void) => void | callback to remove `node` when transition is over. If not provided `node` will be removed automatically | false |
