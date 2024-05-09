export const dummyTrendingBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    categories: ['Fiction', 'Romance', 'Classic', 'Drama'],
    progress: 0.75,
    image: require('../../assets/bookImages/bookOne.png')
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    categories: ['Fiction', 'Classic', 'Legal drama', 'Social issues'],
    progress: 0.5,
    image: require('../../assets/bookImages/bookTwo.png')
  },
  {
    id: '3',
    title: '1984',
    author: 'George Dowell',
    categories: ['Dystopian', 'fiction', 'Political fiction'],
    progress: 0.2,
    image: require('../../assets/bookImages/bookThree.png')
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    categories: ['Romance', 'Classic', 'Comedy of manners'],
    progress: 0.9,
    image: require('../../assets/bookImages/bookFour.png')
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    categories: ['Fiction', 'Coming-of-age', 'Bildungsroman'],
    progress: 0.1,
    image: require('../../assets/bookImages/bookOne.png')
  },
  {
    id: '6',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    categories: ['Fantasy', 'Sport', 'Magic', 'Adventure'],
    progress: 0.35,
    image: require('../../assets/bookImages/bookTwo.png')
  },
  {
    id: '7',
    title: 'The Hobbit',
    author: 'J.Z.R. Tolkien',
    categories: ['Fantasy', 'Adventure', 'Epic'],
    progress: 0.8,
    image: require('../../assets/bookImages/bookFour.png')
  },
  {
    id: '8',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    categories: ['Fantasy', 'Adventure', 'Epic'],
    progress: 0.6,
    image: require('../../assets/bookImages/bookThree.png')
  },
  {
    id: '9',
    title: 'Animal Farm',
    author: 'George Orwell',
    categories: ['Allegory', 'Political satire', 'Dystopian'],
    progress: 0.55,
    image: require('../../assets/bookImages/bookTwo.png')
  },
  {
    id: '10',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    categories: ['Dystopian', 'Young Adult', 'Science fiction', 'Action'],
    progress: 0.85,
    image: require('../../assets/bookImages/bookOne.png')
  },
  {
    id: '11',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    categories: ['Fantasy', 'Adventure', 'Epic'],
    progress: 60,
    image: require('../../assets/bookImages/bookFour.png')
  },
  {
    id: '12',
    title: 'Animal Farm',
    author: 'George Orwell',
    categories: ['Allegory', 'Political satire', 'Dystopian'],
    progress: 55,
    image: require('../../assets/bookImages/bookOne.png')
  },
  {
    id: '13',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    categories: ['Dystopian', 'Young Adult', 'Science fiction', 'Action'],
    progress: 85,
    image: require('../../assets/bookImages/bookTwo.png')
  }
];

export const dummyBooksYouMayLike = [...dummyTrendingBooks];
export const dummyBooksFriendsAreReading = [...dummyTrendingBooks];
export const dummyRecentlyAddedBooks = [...dummyTrendingBooks];
