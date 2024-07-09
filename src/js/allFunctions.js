export function bgUpdate(cat) {
  if (cat === "General Knowledge") {
    return "bg-img-gen bg-pos-y70";
  } else if (cat === "Entertainment: Books") {
    return "bg-img-book bg-pos-y50";
  } else if (cat === "Entertainment: Film" || cat === "Celebrities") {
    return "bg-img-film bg-pos-y70";
  } else if (cat === "Entertainment: Music") {
    return "bg-img-music bg-pos-y70";
  } else if (cat === "Entertainment: Musicals &amp; Theatres") {
    return "bg-img-theatre bg-pos-y50";
  } else if (cat === "Entertainment: Television") {
    return "bg-img-television bg-pos-y70";
  } else if (cat === "Entertainment: Video Games") {
    return "bg-img-game";
  } else if (cat === "Entertainment: Board Games") {
    return "bg-img-board";
  } else if (cat === "Science &amp; Nature" || cat === "Animals") {
    return "bg-img-nature bg-pos-y50";
  } else if (cat === "Science: Computers") {
    return "bg-img-computer bg-pos-y70";
  } else if (cat === "Science: Mathematics") {
    return "bg-img-mathematics bg-pos-y70";
  } else if (cat === "Mythology" || cat === "History") {
    return "bg-img-mythology bg-pos-y50";
  } else if (cat === "Sports") {
    return "bg-img-sport";
  } else if (cat === "Geography") {
    return "bg-img-geography bg-pos-y50";
  } else if (cat === "Politics") {
    return "bg-img-politics bg-pos-y50";
  } else if (cat === "Art") {
    return "bg-img-art bg-pos-y50";
  } else if (cat === "Vehicles") {
    return "bg-img-vehicle bg-pos-y50";
  } else if (
    cat === "Entertainment: Comics" ||
    cat === "Entertainment: Japanese Anime &amp; Manga" ||
    cat === "Entertainment: Cartoon &amp; Animations"
  ) {
    return "bg-img-comic";
  } else if (cat === "Science: Gadgets") {
    return "bg-img-gadgets bg-pos-y50";
  }
}

export function quesCardUpdate(cat) {
  if (
    cat === "Entertainment: Comics" ||
    cat === "Entertainment: Japanese Anime &amp; Manga" ||
    cat === "Entertainment: Cartoon &amp; Animations" ||
    cat === "Entertainment: Books" ||
    cat === "Entertainment: Board Games" ||
    cat === "Politics"
  ) {
    return "que-card-dark text-light px-lg-5 px-3 py-4 mx-lg-5 py-1";
  } else {
    return "que-card text-light px-lg-5 py-4 px-3 mx-lg-5 py-1";
  }
}

export function findCategoryByNum(num) {
  let index = (num) - 9;
  const category = [
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals &amp; Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science &amp; Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime &amp; Manga",
    "Entertainment: Cartoon &amp; Animations",
  ];
  if (index < 0) {
    return "Miscellaneous";
  }else if(index>=0 && index<=32){
    return category[index];
  }else{
    return "Unknown";
  }
}

export function msToTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
}