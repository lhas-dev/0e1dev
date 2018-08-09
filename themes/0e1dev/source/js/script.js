const macy = Macy.init({
    container: '#masonry',
    margin: 30,
    columns: 3,
    breakAt: {
        460: {
            columns: 1,
        },
        960: {
            columns: 2,
        },
        1100: {
            columns: 3,
        },
    }
});

window.onload = function() {
    macy.recalculate(true);
}