export async function getCategories() {
    const res = await fetch(`${process.env.BASE_API_URL}category`, { next: { revalidate: 3600 } })
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }

    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    const vendorRes = await res.json()
    return vendorRes
}
export async function getStates() {
    const resSta = await fetch(`${process.env.BASE_API_URL}state`, { next: { revalidate: 3600 } })
    if (resSta.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }

    if (!resSta.ok) {
        throw new Error(`API request failed with status: ${resSta.status}`);
    }
    return await resSta.json()
}
export async function getMagazines() {
    const res = await fetch(`${process.env.BASE_API_URL}magazine`, { next: { revalidate: 3600 } })
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    const vendorRes = await res.json()
    return vendorRes
}

export async function getBlogs() {
    const res = await fetch(`${process.env.BASE_API_URL}blog-home?limit=3&offset=0`,{ next: { revalidate: 3600 }})
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    const blogRes = await res.json()
    return blogRes
}
  
export async function getVendors(props) {
    
	let state_id='' ;
	if (props && props.state_id !== undefined ) {
        state_id=props.state_id;
    } 
	
    let url = `${process.env.BASE_API_URL}vendor-advertisement?limit=5&offset=0`;
    // console.log('url hai',url)
    if (props && props.latitude !== undefined && props.longitude !== undefined) {
        url += `&latitude=${props.latitude}&longitude=${props.longitude}&state_id=`+state_id;
    } else {
        url += `&latitude=0&longitude=0`;
    }

    const res = await fetch(url, {
        next: { revalidate: 3600 }
    });

    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }

    const vendorRes = await res.json();
    return vendorRes;
}


export  async function getPages(slug) {
    const res = await fetch(`${process.env.BASE_API_URL}page/${slug}`, { next: { revalidate: 3600 } })
    const pageRes = await res.json()
    return pageRes
}
export async function getPostMeta() {
    const res = await fetch(`${process.env.BASE_API_URL}post-meta`, { next: { revalidate: 3600 } })
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    const pageMetaRes = await res.json()
    return pageMetaRes
}

export async function getSiteSetting() {
    const res = await fetch(`${process.env.BASE_API_URL}site_setting`, { next: { revalidate: 3600 } })
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    const siteSettingRes = await res.json()
    return siteSettingRes
}

export  async function getMagazineData(slug) {
    const res = await fetch(`${process.env.BASE_API_URL}magazine/${slug}`, { next: { revalidate: 3600 } })
    const magazineDataRes = await res.json()
    return magazineDataRes
}

export  async function getMagazineAllData() {
    const res = await fetch(`${process.env.BASE_API_URL}magazine`, { next: { revalidate: 3600 } })
    const magazineAllDataRes = await res.json()
    return magazineAllDataRes
}
