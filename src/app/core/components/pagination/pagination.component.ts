import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  readonly pageNumber = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly totalCount = input(0);
  readonly pageSize = input(10);
  readonly loading = input(false);
  readonly pageSizeOptions = input<number[]>([6, 9, 12, 24]);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly pageNumbers = computed(() => {
    const total = Math.max(1, this.totalPages());
    const current = this.pageNumber();
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  goToPage(page: number): void {
    if (this.loading() || page < 1 || page > this.totalPages() || page === this.pageNumber()) {
      return;
    }
    this.pageChange.emit(page);
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (!Number.isNaN(value) && value > 0) {
      this.pageSizeChange.emit(value);
    }
  }
}
