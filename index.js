const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");

const count=30;
const apiKey="9shnWjgHlePbspr2bs8uDJ2nldys82b7LWezMtG6iSA";
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray=[];
let imagesLoaded=0;
let totalImages=0;
let ready=false;

function imageLoaded()
{
    imagesLoaded++;
    if(imagesLoaded===totalImages)
    {
        ready=true;
        loader.hidden=true;
    }
}

function setAttributes(element,attributes)
{
    for(let key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}

function displayPhotos(){
    totalImages=photosArray.length;
    photosArray.forEach((photo)=>{
        let a=document.createElement("a");
        setAttributes(a,{
            href:photo.links.html,
            target:"_blank"
        });

        let img=document.createElement("img");
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        img.addEventListener("load",imageLoaded);
        a.appendChild(img);
        imageContainer.appendChild(a);
    });
}

async function getPhotos()
{
    try 
    {   
        let response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
    } 
    catch (error) 
    {
        console.log(error);
    }
}

window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >=document.body.offsetHeight-1000 && ready)
    {
        ready=false;
        imagesLoaded=0;
        getPhotos();
    }
});

getPhotos();