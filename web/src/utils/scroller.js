declare var UIkit;

export const scroller = (element) => {
    UIkit.scroll( document.querySelector("#scroller"), {offset: 96} ).scrollTo( element );
}