import { Component } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
    selector: 'app-default',
    standalone: true,
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss',
    imports: [NavbarComponent, RouterOutlet, FooterComponent]
})
export class DefaultComponent {

}
