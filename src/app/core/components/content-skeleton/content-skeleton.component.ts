import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-content-skeleton',
  standalone: true,
  templateUrl: './content-skeleton.component.html',
  styleUrl: './content-skeleton.component.css'
})
export class ContentSkeletonComponent {
  readonly count = input(3);
  readonly variant = input<'card' | 'list'>('card');
  readonly indices = computed(() =>
    Array.from({ length: Math.max(0, this.count()) }, (_, index) => index)
  );
}
