import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { IMenuItem } from 'src/app/shared/common-entities.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() authenticated: boolean
  @Input() menus: IMenuItem[]
  @ViewChild('sidebar') sidebar: ElementRef
  @ViewChild('content') content: ElementRef
  @ViewChild('overlay') overlay: ElementRef
  show: boolean
  username: string;
  name: string;
  email: string;
  version: string
  @Output() logout = new EventEmitter()

  constructor(private authService: AuthService, private renderer: Renderer2) { }

  @HostListener('click')
  toggleOverlay() {
    if (this.show) {
      this.renderer.removeClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.removeClass(this.content.nativeElement, 'toggle');
      this.renderer.removeClass(this.overlay.nativeElement, 'toggle');
      this.show = !this.show
    }
  }

  ngOnInit() {
    this.setUsername();
    this.setVersion()
  }

  toggle() {
    this.show = !this.show
    if (this.show) {
      this.renderer.addClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.addClass(this.content.nativeElement, 'toggle');
      this.renderer.addClass(this.overlay.nativeElement, 'toggle');
    } else {
      this.renderer.removeClass(this.sidebar.nativeElement, 'toggle');
      this.renderer.removeClass(this.content.nativeElement, 'toggle');
      this.renderer.removeClass(this.overlay.nativeElement, 'toggle');
    }
  }

  setUsername() {
    const user = this.authService.currentUser;
    if (user) {
      this.name = user.name;
      this.username = user.username;
      this.email = user.email
    }
  }

  doLogout() {
    this.logout.emit()
  }

  private setVersion() {
    this.version = 'v1.0.0'
  }
}
