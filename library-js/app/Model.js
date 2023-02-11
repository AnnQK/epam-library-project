function Model() {
  this.books = [];
  this.tagsList = new TagsClass([
    "Must Read Titles",
    "Best Of List",
    "Classic Novels",
    "Non Fiction",
  ]);
}

function TagsClass(defaultTags) {
  this.tags = defaultTags;
}
