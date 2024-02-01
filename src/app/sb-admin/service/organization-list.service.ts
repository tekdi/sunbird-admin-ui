import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import config from 'src/config/url.config.json'
import { SessionStorageService } from './login.service';

@Injectable({
	providedIn: 'root',
})
export class OrganizationListService {
	private accessToken: any;
	private authToken: any;
	private targeturl: any;
	constructor(private http: HttpClient,
		private sessionStorageService: SessionStorageService) {
		this.accessToken = this.sessionStorageService.getAccessToken();
		this.authToken = this.sessionStorageService.getAuthToken();
		this.targeturl = this.sessionStorageService.getTargetUrl();
		
	}

	getAllOrgSubOrg(body: any): Observable<Object> {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		return this.http.post(
			this.targeturl + `/` + config.URLS.ORGNIZATION_SEARCH_URL,
			body,
			{
				headers: header,
			},
		);
	}

	addOrg(body: any): Observable<any> {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: this.authToken,
			'x-authenticated-user-token': this.accessToken,
		});
		return this.http.post(
			this.targeturl + `/` + config.URLS.ORGANIZATION_CREATE_URL,
			body,
			{
				headers: header,
			},
		);
	}

	editOrg(body: any): Observable<any> {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: this.authToken,
			'x-authenticated-user-token': this.accessToken,
		});
		return this.http.patch(
			this.targeturl + `/` + config.URLS.ORGANIZATION_UPDATE_URL,
			body,
			{
				headers: header,
			},
		);
	}

	addSubOrg(body: any): Observable<any> {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: this.authToken,
			'x-authenticated-user-token': this.accessToken,
		});

		return this.http.post(
			this.targeturl + `/` + config.URLS.ORGANIZATION_CREATE_URL,
			body,
			{
				headers: header,
			},
		);
	}

	getUserandSystemTypeCount(body: any): Observable<any> {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: this.authToken,
			'x-authenticated-user-token': this.accessToken,
		});
		return this.http.post(
			this.targeturl + `/` + config.URLS.USER_SEARCH_URL,
			body,
			{
				headers: header,
			},
		);
	}

	getContentTypeCount(body: any): Observable<object> {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
		});
		return this.http.post(
			this.targeturl + `/` + config.URLS.COMPOSITE_SEARCH_URL,
			body,
			{
				headers: header,
			},
		);
	}
}
