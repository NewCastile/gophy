# Gophy

## Simple

Gophy is a SPA where you can see todays trendings on Giphy and other gifs respecting to Giphy's API available categories, and
look up for others thru the search bar shown above the page title. See demo [here](https://gophy.vercel.app/).

## Leitmotiv: Kill Bill

Gophy borns as my revenge from a really cool project i made called Blue Horizon. Basically i couldn't make it to production with blue horizon because of a certain NewsAPI policy for the developer plan which said:

_The Developer plan may be used for development and testing in a development environment only, and cannot be used in a staging or production environment (including internally)_.

I guess thats what you get if you dont read the terms.

Not just that but at the time i was lazy enough not to do some data fetching hooks for building my own infinite scroll, this time i made it, which drive me to relearning i really cool hook known by the name of **useReducer**.

So you may seen a lot of videos where the guy is using react with no data fetching library and pretty much the components has two useState:

```js
const [something, setSomething] = useState<ISomething>()
const [isLoading, setIsLoading] = useState<boolean>(false)

// And maybe...
const [error, setError] = useState()
```

Changing the state in a useEffect hook.

So you have **three** useState in a component, not bad but i also need to fetch the next page, so another useState? also setThis and setThat when you are reading it sounds ok but i really like what you get with useReducer, everytime you have an error or you get the results you want or _you intersect the element you are observing_ you _do_ something about it, you make an action.

So it makes more sense (at least to me) that when you get the results you wanted you do a success action, changing the state to one that represents this state instead of just setting things to a value. My point is, for use cases where you have mutiple values representing the state of a component you should go for useReducer not only you get a more representing state but you gain some readability, so rant over.

## A peace treaty on responsiveness

You should know that this simple app is not responsive (please hear me out). The animation of the carrousel component is based on the width of the gifs so if it were reponsive when you zoom in or zoom out things would probably see a little weird, so in the future i might change the component animation to work with the width of its childrens and do something with the Resize Observer API to see if i can make my way out of this condeem.

## Things i might missed

Just a list of stuff i might do in the future:

- Masonry for the Scroll Screen.
- Adding and onClick handler to the gifs boxes to redirect to their page on Giphy.
- Responsiveness. ✔️
- Lightmode (even though i hate it).
- UI Redesign.
