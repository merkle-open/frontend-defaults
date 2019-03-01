export interface IPackageJson {
	name?: string;
	description?: string;
	version?: string;
	repository?: string;
	main?: string;
	typings?: string;
	bin?:
		| string
		| {
				[key: string]: string;
		  };
	license?: string;
	author?: string;
	contributors?: string[];
	private?: boolean;
	engines?: {
		[key: string]: string;
	};
	files?: string[];
	scripts?: {
		[key: string]: string;
	};
	devDependencies?: {
		[key: string]: string;
	};
	dependencies?: {
		[key: string]: string;
	};
}
