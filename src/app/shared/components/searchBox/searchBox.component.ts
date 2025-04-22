import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { User } from '../../../modules/access/users/interfaces/coordinators.interfaces';
import { Region } from '../../../modules/location/region/interfaces/region.interfaces';
import { Zone } from '../../../modules/location/zone/interfaces/zone.interfaces';

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './searchBox.component.html',
  styleUrls: ['./searchBox.component.css'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Input()
  public showCoordinator: boolean = false;

  @Input()
  public showRegion: boolean = false;

  @Input()
  public showZone: boolean = false;

  @Input()
  public showDownload: boolean = false;

  @Input()
  public coordinators: User[] = [];

  @Input()
  public regions: Region[] = [];

  @Input()
  public regionSeleccionada: number | string = '';

  @Input()
  public zonaSeleccionada: number | string = '';

  @Input()
  public zones: Zone[] = [];

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onCoordinator: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onRegion: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onZone: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDownload: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );

    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( value: string ): void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

  onCoordinatorChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onCoordinator.emit( value )
  }

  onRegionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onRegion.emit( value )
  }

  onZoneChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onZone.emit( value )
  }

  onDownloadExcel(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onDownload.emit(value);
  }

}
