export function cardComments(data){
    
    var card = `<div class="p-2">`
    data.forEach(data => {
        card += `
        <div class="card border-0 mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-2">
                        <div class="d-flex flex-column bg-purple-light justify-content-around control-comment p-2">
                            <span role="button" class="align-self-center">
                                <i class="fas fa-plus text-purple-medium"></i>
                            </span>
                            <span class="align-self-center">
                                <strong class="text-purple-dark">
                                    12
                                </strong>
                            </span>
                            <span role="button" class="align-self-center">
                                <i class="fas fa-minus text-purple-medium"></i>
                            </span>
                        </div>
                    </div>
                    <div class="col-10 d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div class="thumbnail-profile">
                                    <img src="./assets/img/${data.profile}">
                                </div>
                                <span class="fw-bold px-2">${data.name}</span>
                                <span class="text-muted px-2">${data.date}</span>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <i class="fas fa-reply mx-2 text-purple-dark"></i>
                                <span class="fw-bold text-purple-dark">Reply</span>
                            </div>
                        </div>
                        <div>
                            <p>
                                ${data.comment}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    card += `</div>`

    return card
}