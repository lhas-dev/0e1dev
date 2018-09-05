if(document.querySelectorAll('#masonry').length > 0) {
    const macy = Macy.init({
        container: '#masonry',
        margin: 30,
        columns: 4,
        breakAt: {
            460: {
                columns: 1,
            },
            860: {
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
}