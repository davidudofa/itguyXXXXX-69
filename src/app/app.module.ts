import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { IonSimpleWizardModule } from '../components/ion-simple-wizard/ion-simple-wizard.module';
import { IonTagsInputModule } from 'ionic-tags-input';


import { RegisterPageModule } from '../pages/register/register.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { LoginPageModule } from '../pages/login/login.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { ChatsPageModule } from '../pages/chats/chats.module';
import { BlogPageModule } from '../pages/blog/blog.module';
import { AppointmentsPageModule } from '../pages/appointments/appointments.module';
import { ProfilePageModule } from '../pages/profile/profile.module';


import { DashPopoverContentPage } from '../popovers/dashboard/popover';
import { EditReviewContentPage } from '../popovers/dashboard/editreview';
import { ChatModule } from '../popovers/chats/modal.module';
import { AppointmentModule } from '../popovers/appointments/modal.module';
import { NewAppointmentModule } from '../popovers/newappointments/modal.module';
import { ItGuyModule } from '../popovers/itguy/modal.module';
import { ViewReviewModule } from '../popovers/reviews/modal.module';
import { ProfileModule } from '../popovers/profile/modal.module';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserprofileService } from '../providers/appservice/appservice';
import { ChatServiceProvider } from '../providers/chat-service/chatservice';
import { ItGuyService } from '../providers/itguy-service/itguyservice';
import { AppointServiceProvider } from '../providers/appointment-service/appointmentservice';
import { EmojiProvider } from '../providers/emoji';
import { ProfileService } from '../providers/profile-service/profileservice';

@NgModule({
  declarations: [
    MyApp,
    DashPopoverContentPage,
    EditReviewContentPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonSimpleWizardModule,
    LoginPageModule,
    RegisterPageModule,
    TabsPageModule,
    DashboardPageModule,
    ChatsPageModule,
    BlogPageModule,
    ChatModule,
    AppointmentModule,
    NewAppointmentModule,
    ItGuyModule,
    ViewReviewModule,
    AppointmentsPageModule,
    ProfilePageModule,
    ProfileModule,
    IonTagsInputModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashPopoverContentPage,
    EditReviewContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider, UserprofileService, ChatServiceProvider, EmojiProvider, AppointServiceProvider, ItGuyService, ProfileService
  ]
})
export class AppModule {}
