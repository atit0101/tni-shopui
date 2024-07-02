import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-showitem',
  standalone: true,
  imports: [],
  templateUrl: './showitem.component.html',
  styleUrl: './showitem.component.scss'
})
export class ShowitemComponent {
  constructor(private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    let data = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
  }
}
