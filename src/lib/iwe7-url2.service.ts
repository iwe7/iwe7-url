import { Injectable, Inject } from "@angular/core";
import { ENV } from './iwe7-url.service';
import { getUrl } from "iwe7-util";

@Injectable({
    providedIn: "root"
})
export class Iwe7Url2Service {
    constructor(@Inject(ENV) private env: any) { }

    private get root() {
        return this.env.root;
    }

    setEnvRoot(root: string): this {
        this.env.root = root;
        return this;
    }

    setEnvUniacid(i: string): this {
        this.env.i = i;
        return this;
    }

    private getUrl(params: any = {}): string {
        return getUrl(params);
    }

    getSite(_do: string, _params: any = {}): string {
        _params["do"] = _do;
        _params["i"] = this.env.i;
        _params["m"] = this.env.m;
        _params["c"] = "entry";
        _params["a"] = "site";
        _params["isajax"] = true;
        return `${this.env.root}app/index.php${this.getUrl(_params)}`;
    }
    getSiteUrl(_do: string, _params: any = {}): string {
        return this.getSite(_do, _params);
    }

    getPhoneapp(_do: string, _params: any = {}): string {
        _params["do"] = _do;
        _params["i"] = this.env.i;
        _params["m"] = this.env.m;
        _params["c"] = "entry";
        _params["a"] = "phoneapp";
        _params["isajax"] = true;
        return `${this.env.root}app/index.php${this.getUrl(_params)}`;
    }

    getOpenUrl(_open: string, _params: any = {}): string {
        const url = this.getPhoneapp("open", {
            ..._params,
            ...{ open: _open }
        });
        return url;
    }
}
