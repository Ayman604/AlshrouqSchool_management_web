import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email = '';

  onSubscribe(event: Event): void {
    event.preventDefault();
    if (this.email) {
      alert('<i class="fa-solid fa-check-circle"></i> تم الاشتراك بنجاح! شكراً لانضمامك.');
      this.email = '';
    }
  }
}
