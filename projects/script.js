$(document).ready(function () {

    // Render projects from projects.json
    fetch('projects.json')
        .then(function (res) { return res.json(); })
        .then(function (projects) {
            var html = projects.map(function (p) {
                return '<div class="box tilt ' + p.status + '" data-status="' + p.status + '">' +
                    '<img draggable="false" src="/assets/images/projects/' + p.image + '.png" alt="' + p.name + '" onerror="this.style.display=\'none\'" />' +
                    '<div class="content">' +
                    '<div class="tag"><h3>' + p.name + '</h3><span class="status ' + p.status + '">' + p.status + '</span></div>' +
                    '<div class="desc"><p>' + p.desc + '</p>' +
                    '<div class="btns">' +
                    '<a href="' + p.links.view + '" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>' +
                    '<a href="' + p.links.code + '" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>' +
                    '</div></div></div></div>';
            }).join('');
            $('.work .box-container').html(html);
        })
        .catch(function (err) { console.error('Could not load projects.json', err); });

    // Filter buttons (All / Completed / Ongoing)
    $('#filters').on('click', '.btn', function () {
        $('#filters .btn').removeClass('is-checked');
        $(this).addClass('is-checked');
        var f = $(this).data('filter');
        $('.work .box-container .box').each(function () {
            $(this).toggle(f === 'all' || $(this).data('status') === f);
        });
    });

    // Mobile menu
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Close menu on scroll and control scroll-to-top button
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });

    // Close menu when a navigation link is clicked
    $('.navbar a').on('click', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
    });

});

// Change page title when switching tabs
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        document.title = 'Projects | My Portfolio';
    } else {
        document.title = 'Come Back To Portfolio';
    }
});