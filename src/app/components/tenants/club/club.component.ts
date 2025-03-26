import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TenantServiceService } from '../../../services/shared/tenant-service.service';
import { ClubModel } from '../../../model/club.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.scss'
})
export class ClubComponent {

  public clubId: string = '';
  public clubModel: ClubModel | null = null; // Updated type
  public clubMainImage: string = '';
  public reviewPercent = 0.9;

  constructor(
    private route: ActivatedRoute,
    private tenantService: TenantServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clubId = this.route.snapshot.params['id'];
    this.tenantService.getClubById(this.clubId).subscribe((res) => {
      if(res.isSuccess){
        this.clubModel = res.value as ClubModel;
        this.clubMainImage = this.clubModel.clubImages[0].imageLink;
        console.log(this.clubModel);
      }
    });
  }

  ngOnDestroy(): void {
  }

  clickClub(){
    if (this.clubModel) {
      localStorage.setItem('tenant', this.clubModel.code);
    }
    this.router.navigate(['/booking']);
  }
}
