import musicPlayer from "./music-player";
import { slick } from "./slick";
import ajax from "./ajax";
import trans from "../trans"

//Call slide function
slick();

ajax.sidebar.getPlaylist();

ajax.sidebar.getFavoritePlaylist();

//Call handleEvent for play music
musicPlayer.handleEvents();

//Call handle url history function to navigation
ajax.main.getUrlParam();

$(document).on('click', ".comment-reply", function(e) {
    var indexclicked = $('.comment-reply').index(this);
    $('.reply-input')[indexclicked].classList.toggle('active');
    $('.reply-list')[indexclicked].classList.toggle('active');
});
//Navigation route by button sidebar
$(document).on("click", "#homepage-button", ajax.main.homepage);

$(document).on("click", "#search-button", ajax.main.searchpage);

$(document).on("click", ".category", function () {
    ajax.main.categorypage(this.getAttribute("data-id"));
});

$(document).on("click", ".album", function (event) {
    ajax.main.albumpage(this.getAttribute("data-id"));
});

$(document).on("click", ".author", function (event) {
    ajax.main.authorpage(this.getAttribute("data-id"));
});

$(document).on("click", ".user-playlist .menu-item", function (event) {
    ajax.main.playlistPage(this.getAttribute("data-id"));
});

$(document).on("click", ".favorite", function (event) {
    ajax.main.playlistPage(this.getAttribute("data-id"));
    ajax.sidebar.unactiveMenuItems();
    this.classList.add("c-active");
});

$(document).on("click", "#create-playlist .btn-create", async function (event) {
    event.preventDefault();
    await ajax.playlist.createPlaylist();
});

$(document).on("click", ".unlike", async function () {
    $("#song-id-select").val($("#song-id").val());
    await ajax.playlist.addToFavorite();
});

$(document).on("click", ".liked", async function () {
    $("#song-id-select").val($("#song-id").val());
    await ajax.playlist.removeFromFavorite();
});

$(document).on("click", ".add-to-playlist", async function () {
    await ajax.playlist.getPlaylistSelect();
});

$(document).on("click", ".btn-add", async function () {
    $("#song-id-select").val($("#song-id").val());
    event.preventDefault();
    await ajax.playlist.addToPlaylist();
});

$(document).on("click", ".delete-playlist", async function () {
    if(confirm(trans.__('confirm_delete_playlist')))
        await ajax.playlist.deletePlaylist();
});

$(document).on('submit', ajax.search.formEl, function (e) {
    e.preventDefault();
    ajax.search.search();
});

let searchFire = 0;
$(document).on('keyup', ajax.search.inputEl, function (e) {
    clearTimeout(searchFire);
    searchFire = setTimeout(() => {
        ajax.search.search();
    }, 1000);
});
