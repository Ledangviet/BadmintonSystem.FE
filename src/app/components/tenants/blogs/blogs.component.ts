import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {


  articles = [
    {
      image: 'https://example.com/article1.jpg',
      title: 'Mastering the Smash: Advanced Badminton Techniques',
      author: 'Chris Lee',
      category: 'Badminton',
      date: 'April 4, 2025'
    },
    {
      image: 'https://example.com/article2.jpg',
      title: 'The Evolution of Football Tactics Over the Decades',
      author: 'Jamie Smith',
      category: 'Football',
      date: 'April 3, 2025'
    },
    {
      image: 'https://example.com/article3.jpg',
      title: 'Volleyball Training: Essential Drills for Every Player',
      author: 'Taylor Brown',
      category: 'Volleyball',
      date: 'April 2, 2025'
    },
    {
      image: 'https://example.com/article4.jpg',
      title: 'Top 5 Strategies to Dominate in Beach Volleyball',
      author: 'Jordan Davis',
      category: 'Volleyball',
      date: 'April 1, 2025'
    }
  ];


  trending = [
    {
      title: 'How to Choose the Right Badminton Racket',
      author: 'Chris Lee',
      category: 'Badminton',
      readingTime: '5 min read',
      date: 'April 4, 2025'
    },
    {
      title: 'Top Football Drills for Speed and Agility',
      author: 'Jamie Smith',
      category: 'Football',
      readingTime: '6 min read',
      date: 'April 3, 2025'
    },
    {
      title: 'Volleyball Tips for Perfecting Your Serve',
      author: 'Taylor Brown',
      category: 'Volleyball',
      readingTime: '4 min read',
      date: 'April 2, 2025'
    },
    {
      title: 'The Mental Game: Staying Focused in Competitive Sports',
      author: 'Jordan Davis',
      category: 'General',
      readingTime: '7 min read',
      date: 'April 1, 2025'
    }
  ];

}
