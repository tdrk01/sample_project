declare var UIkit;

export const openBoxes = () => {
    UIkit.modal("#boxes-modal", {
        container: false
    }).show();
}