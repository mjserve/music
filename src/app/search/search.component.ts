/*
 * Angular
 */

import {Component, OnInit} from '@angular/core';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';

//Import SpotifyService
import {SpotifyService} from '../spotify.service';
;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;

  /*Constructor for the Search component subscribes to queryParams and
  accesses the query made by the user typing input*/
  constructor(private spotify: SpotifyService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; });
  }

  //Allows for searching via query param provided in URL(?)
  ngOnInit(): void {
    this.search();
  }

  /*Method to handle text input from user called when user enters input in
  search field.  User does not have to hit enter*/
  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search() );
  }

  /*search() uses the result assigned to the variable 'query'
  to subscribe to another observable provided by SpotifyService.
  This observable is then passed to renderResults()*/
  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }

    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  /*Sets the 'result' variable of search.component.ts to reflect
  what the user has searched*/
  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }
}
